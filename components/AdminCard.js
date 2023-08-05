import Link from "next/link";

const AdminCard = ({ experience }) => {
  const { job, description, published, _id } = experience;

  console.log("EXPRIENCE: ", experience);

  return (
    <div className="admincard__wrap">
      <div className="admincard__wrap-left">
        <h3>{job}</h3>
        <p>{description}</p>
      </div>
      <div className="admincard__wrap-right">
        <span>Borrar</span>
        <Link href={`/admin/experiences/edit/${_id}`}>Editar</Link>
        <span>{published ? "Publicado" : "Borrador"}</span>
      </div>
    </div>
  );
};

export default AdminCard;
