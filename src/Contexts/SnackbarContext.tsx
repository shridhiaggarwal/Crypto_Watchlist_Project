import { createContext, useReducer, useState } from "react";

interface ISnackbarProps {
  open: boolean;
  message: string;
  showSnackbar: (message: string) => void;
  handleClose: () => void;
}

export const SnackbarContext = createContext<undefined | ISnackbarProps>(
  undefined
);

export const SnackbarProvider = (props: any) => {
  const { children } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const showSnackbar = (message: string) => {
    setMessage(message);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider
      value={{ open, message, showSnackbar, handleClose }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};
