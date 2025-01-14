interface Password {
  id: number;
  service: string;
  password: string;
}

interface PasswordValue extends Omit<Password, "id"> {}
