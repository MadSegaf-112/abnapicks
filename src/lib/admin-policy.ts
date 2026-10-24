export function hasAdminClaim(metadata: Record<string, unknown> | undefined): boolean {
  return metadata?.role === "admin" || metadata?.is_admin === true;
}
