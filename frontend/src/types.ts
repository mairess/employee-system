export type EmployeeType = {
  id: number | null,
  photo: string,
  fullName: string,
  position: string,
  admission: string,
  phone: string
};

export type PaginationType = {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  totalPages: number;
};

export type UserType = {
  id: number | null,
  photo: string,
  fullName: string,
  username: string,
  email: string,
  role: string,
};

export type ApiResponseEmployeeType = {
  employees: EmployeeType[];
  pagination: PaginationType;
};

export type ApiResponseUserType = {
  users: UserType[];
  pagination: PaginationType;
};

export type DecodedTokenType = {
  sub: string;
  role: string;
  exp: string
};
