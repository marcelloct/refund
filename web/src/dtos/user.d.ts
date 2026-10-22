// dtos = data transfer objects. Data that travel between Front and Back End

type UserAPIRole = 'employee' | 'manager';

type UserAPIResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserAPIRole;
  };
};
