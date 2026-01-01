import { useContext, useState } from "react";
import { useRouter } from "next/router";

import { AdminContext } from "../context/AdminContext";

import { deleteExperience } from "../api/experience";
import { deletePost } from "../api/post";

import FormNotifier from "./FormNotifier";

const DeleteModal = ({ postType }) => {
  const router = useRouter();
  const { deleteId, setShowModal, setRefreshData } = useContext(AdminContext);
  const [inputValue, setInputValue] = useState("");
  const [errors, setErrors] = useState([]);
  const [validating, setValidating] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setValidating(true);

    if (inputValue === deleteId) {
      if (postType === "experiences") {
        async function deleteExperienceById() {
          const response = await deleteExperience(deleteId);
          setRefreshData(true);

          response?.status === 200
            ? setShowModal(false)
            : setErrors([{ field: "servidor", message: "Algo salió mal" }]);
        }

        deleteExperienceById();
      } else if (postType === "posts") {
        async function deletePostById() {
          const response = await deletePost(deleteId);
          setRefreshData(true);

          response?.status === 200
            ? setShowModal(false)
            : setErrors([{ field: "servidor", message: "Algo salió mal" }]);
        }
        deletePostById();
      }
      router.reload();
    } else {
      setErrors([{ field: "text", message: "Mete el código correcto." }]);
    }
  };

  return (
    <>
      <p>Estás a punto de borrar el siguiente contenido. Una vez borrado, no se podrá recuperar.</p>
      <br />
      <p>
        Por favor, verifica que quieres borrar el fichero metiendo{" "}
        <strong style={{ fontWeight: "Bold" }}>{deleteId}</strong> en el siguiente campo.
      </p>
      <form method="post" onSubmit={handleSubmit}>
        <input name="text" onChange={handleChange} type="text" value={inputValue} />
        <FormNotifier errors={errors} />
        <div className="form-actions">
          <input type="submit" value="Borrar" />
        </div>
      </form>
    </>
  );
};

export default DeleteModal;
