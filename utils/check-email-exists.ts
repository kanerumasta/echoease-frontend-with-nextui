export async function checkEmailExists(email: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/check-email/${email}`,
  );

  if (response.status === 404) {
    return false;
  }

  return true;
}
