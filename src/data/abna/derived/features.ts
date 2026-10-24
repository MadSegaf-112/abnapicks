import type { RawABNAProductRow, AbnaProduct, AbnaOlfactiveEnrichmentRecord } from "../types";
import {
  normalizeBrand,
  normalizeCommercialGender,
  normalizePriceTier,
  createDeterministicProductId,
} from "../normalization";
import { deriveOlfactiveFeatures } from "../../olfactive/dictionary";

/**
 * Transforms a single raw Excel product row and optional enrichment record into a canonical AbnaProduct.
 */
export function buildCanonicalAbnaProduct(
  raw: RawABNAProductRow,
  enrichment?: AbnaOlfactiveEnrichmentRecord,
): AbnaProduct {
  const name = raw.namaParfum ? raw.namaParfum.trim() : "";
  const rawBrand = raw.designer ? raw.designer.trim() : "";
  const brand = normalizeBrand(rawBrand);
  const tier = normalizePriceTier(raw.kategoriHarga);
  const rawGender = raw.kategoriGender ? raw.kategoriGender.trim() : "";
  const { gender, genderSource } = normalizeCommercialGender(rawGender, name);
  const id = createDeterministicProductId(name, rawBrand, tier, raw.rowNumber);

  const pricePerMl = Number(raw.hargaPerML) || 0;
  const stockQty = Number(raw.stockQty) || 0;
  const concentrationPercent =
    raw.persentaseBibit !== undefined && raw.persentaseBibit !== null
      ? Number(raw.persentaseBibit)
      : null;

  // Base master structure with commercial truth
  const product: AbnaProduct = {
    id,
    rawRowNumber: raw.rowNumber,
    identity: {
      name,
      brand,
      rawBrand,
      code: raw.kode ? raw.kode.trim() : null,
      fullCode: raw.kodeLengkap ? raw.kodeLengkap.trim() : null,
      gender,
      rawGender,
      genderSource,
    },
    catalog: {
      tier,
      rawTier: raw.kategoriHarga,
      pricePerMl,
      prices: {
        ml10: raw.harga10ML !== undefined && raw.harga10ML !== null ? Number(raw.harga10ML) : null,
        ml30: raw.harga30ML !== undefined && raw.harga30ML !== null ? Number(raw.harga30ML) : null,
        ml50: raw.harga50ML !== undefined && raw.harga50ML !== null ? Number(raw.harga50ML) : null,
        ml100:
          raw.harga100ML !== undefined && raw.harga100ML !== null ? Number(raw.harga100ML) : null,
      },
      stockQty,
      inStock: stockQty > 0,
      concentrationPercent,
      discountPercent: Number(raw.persentaseDiskon) || 0,
    },
    olfactive: {
      status: "not_enriched",
    },
  };

  // If enrichment is provided, connect to Phase 6C-1 derivation engine
  if (enrichment) {
    product.olfactive = {
      status: "incomplete",
      notes: enrichment.notes,
      accords: enrichment.accords,
      fragranceFamily: enrichment.fragranceFamily,
      editorialStory: enrichment.editorialStory,
      occasions: enrichment.occasions,
      timeOfDay: enrichment.timeOfDay,
      seasons: enrichment.seasons,
      source: enrichment.source,
    };

    if (enrichment.notes) {
      const topNotes = enrichment.notes.top || [];
      const middleNotes = enrichment.notes.middle || [];
      const baseNotes = enrichment.notes.base || [];
      const accords = enrichment.accords || [];

      // Derive 10D feature vector using Phase 6C-1 engine
      const derivationResult = deriveOlfactiveFeatures({
        topNotes,
        middleNotes,
        baseNotes,
        accords,
        performance: enrichment.performance,
      });

      product.derived = {
        features: derivationResult.features,
        confidence: derivationResult.metadata.confidence,
        confidenceTier: derivationResult.metadata.confidenceTier,
        unknownNotes: derivationResult.metadata.unknownNotes,
        unknownAccords: derivationResult.metadata.unknownAccords,
        metadata: derivationResult.metadata,
      };

      // Set olfactive status based on derivation quality
      if (
        derivationResult.metadata.confidence >= 0.8 &&
        derivationResult.metadata.unknownNotes.length === 0
      ) {
        product.olfactive.status = "validated";
      } else if (derivationResult.metadata.confidence >= 0.6) {
        product.olfactive.status = "review_required";
      } else {
        product.olfactive.status = "incomplete";
      }
    }
  }

  return product;
}
