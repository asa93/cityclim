

export function formatDate(date_: string) {
  const date = new Date(date_);
  return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
}

