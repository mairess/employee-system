export type EmployeeType = {
  id: number,
  photo: string,
  fullName: string,
  position: string,
  admission: string,
  phone: string
};

export type UserType = {
  id: number | null,
  fullName: string,
  username: string,
  email: string,
  password: string,
  role: string,
};
