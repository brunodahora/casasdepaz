export { UserContext } from "./UserContext";

export const addCpfMask = cpf => {
  if (cpf.length < 3) return cpf;

  const cleanCpf = cpf.replace(/\D/g, "");
  if (cleanCpf.length < 6)
    return `${cleanCpf.substring(0, 3)}.${cleanCpf.substring(3)}`;
  if (cleanCpf.length < 9)
    return `${cleanCpf.substring(0, 3)}.${cleanCpf.substring(
      3,
      6
    )}.${cleanCpf.substring(6)}`;
  return `${cleanCpf.substring(0, 3)}.${cleanCpf.substring(
    3,
    6
  )}.${cleanCpf.substring(6, 9)}-${cleanCpf.substring(9)}`;
};

export const addPhoneMask = phone => {
  if (phone.length < 2) return phone;

  const cleanPhone = phone.replace(/\D/g, "");
  if (cleanPhone.length < 6)
    return `(${cleanPhone.substring(0, 2)}) ${cleanPhone.substring(2)}`;
  if (cleanPhone.length < 11)
    return `(${cleanPhone.substring(0, 2)}) ${cleanPhone.substring(
      2,
      6
    )}-${cleanPhone.substring(6)}`;
  return `(${cleanPhone.substring(0, 2)}) ${cleanPhone.substring(
    2,
    7
  )}-${cleanPhone.substring(7)}`;
};
