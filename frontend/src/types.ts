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
  photo: string,
  fullName: string,
  username: string,
  email: string,
  role: string,
};
