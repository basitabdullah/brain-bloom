import toast from "react-hot-toast";

export const successToast = (message)=>{
    toast.success(message, {
        style: {
          padding: "10px",
          color: "#fff",
          background: "#333",
        },
        iconTheme: {
          primary: "#939393",
          secondary: "#FFFAEE",
        },
      });
}

export const errorToast = (message)=>{
    toast.error(message, {
        style: {
          padding: "10px",
          color: "#fff",
          background: "#333",
        },
        iconTheme: {
          primary: "#ff0000",
          secondary: "#FFFAEE",
        },
      });
}