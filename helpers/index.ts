export { UserContext } from "./UserContext";

export const addCpfMask = cpf => {
  if (cpf.length < 3) return cpf;

  const cleanCpf = cpf.replace(/[\.-]/g, "");
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
