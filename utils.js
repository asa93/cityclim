export function formatDate(date_) {
  const date = new Date(date_);
  return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
}
