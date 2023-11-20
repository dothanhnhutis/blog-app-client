import React from "react";

const EditPostModal = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <p>EditPostModal</p>
      {params.id}
    </div>
  );
};

export default EditPostModal;
