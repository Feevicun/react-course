import React, { ReactNode, createContext, useContext, useState } from "react";
import { FormData } from "./music";
import { FormDataUser } from "./user";

interface FormDataContextType {
  formData: FormData[];
  setFormData: React.Dispatch<React.SetStateAction<FormData[]>>;
}

export const FormDataContext = createContext<FormDataContextType | undefined>(
  undefined
);

export const useFormData = () => {
  const formData = useContext(FormDataContext);
  if (formData === undefined) {
    throw new Error("FormDataContext must be used within a FormDataProvider");
  }
  return formData;
};

export const MusicProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState<FormData[]>([]);

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};

interface UserDataContextType {
  userData: FormDataUser[];
  setUserData: React.Dispatch<React.SetStateAction<FormDataUser[]>>;
}

export const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined
);

export const useUserData = () => {
  const userData = useContext(UserDataContext);
  if (userData === undefined) {
    throw new Error("UserDataContext must be used within a UserDataProvider");
  }
  return userData;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<FormDataUser[]>([]);

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};
