export { UserContext } from "./UserContext";

export const addCpfMask = (cpf: string): string => {
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

export const addPhoneMask = (phone: string): string => {
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

//18:00 - 19:00
export const addTimeMask = (time: string): string => {
  if (time.length === 1) {
    if (parseInt(time) >= 3) return "";
    return time;
  }
  if (time.length === 2) {
    if (parseInt(time) >= 24) return time[1];
    return time;
  }

  const cleanTime = time.replace(/\D/g, "");
  if (cleanTime.length === 3) {
    if (cleanTime[2] > 5) return cleanTime.substring(0, 2);
    return `${cleanTime.substring(0, 2)}:${cleanTime.substring(2)}`;
  }
  if (cleanTime.length === 4)
    return `${cleanTime.substring(0, 2)}:${cleanTime.substring(2, 4)}`;
  if (cleanTime.length === 5) {
    if (parseInt(cleanTime[4]) > 2)
      return `${cleanTime.substring(0, 2)}:${cleanTime.substring(2, 4)}`;
    return `${cleanTime.substring(0, 2)}:${cleanTime.substring(
      2,
      4
    )} - ${cleanTime.substring(4)}`;
  }
  if (cleanTime.length === 6) {
    if (parseInt(cleanTime.substring(4, 6)) >= 24)
      return `${cleanTime.substring(0, 2)}:${cleanTime.substring(2, 4)} - ${
        cleanTime[4]
      }`;
    return `${cleanTime.substring(0, 2)}:${cleanTime.substring(
      2,
      4
    )} - ${cleanTime.substring(4)}`;
  }
  if (cleanTime.length > 6) {
    if (parseInt(cleanTime[6]) > 5)
      return `${cleanTime.substring(0, 2)}:${cleanTime.substring(
        2,
        4
      )} - ${cleanTime.substring(4, 6)}`;
    return `${cleanTime.substring(0, 2)}:${cleanTime.substring(
      2,
      4
    )} - ${cleanTime.substring(4, 6)}:${cleanTime.substring(6)}`;
  }
};

export const addCepMask = (cep: string): string => {
  if (cep.length < 6) return cep;

  const cleanCep = cep.replace(/\D/g, "");

  return `${cleanCep.substring(0, 5)}-${cleanCep.substring(5)}`;
};
