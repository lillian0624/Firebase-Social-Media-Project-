import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db, app } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";

const storage = getStorage(app);

interface CreateFormData {
  title: string;
  description: string;
  image?: FileList;
}

export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  const schema = yup.object().shape({
    title: yup.string().required("You must add a title."),
    description: yup.string().required("You must add a Description."),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");

const onCreatePost = async (data: CreateFormData) => {
  setUploading(true);
  try {
    let imageUrl = "";
    if (data.image && data.image[0]) {
      const imageRef = ref(storage, `postImages/${Date.now()}_${data.image[0].name}`);
      await uploadBytes(imageRef, data.image[0]);
      imageUrl = await getDownloadURL(imageRef);
    }
    await addDoc(postsRef, {
      title: data.title,
      description: data.description,
      username: user?.displayName,
      userId: user?.uid,
      imageUrl,
    });
    navigate("/");
  } catch (error) {
    console.error("Error creating post:", error);
    alert("Failed to create post. Please try again.");
  } finally {
    setUploading(false);
  }
};

  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <input placeholder="Title..." {...register("title")} />
      <p style={{ color: "red" }}>{errors.title?.message}</p>
      <textarea placeholder="Description..." {...register("description")} />
      <p style={{ color: "red" }}>{errors.description?.message}</p>
      <input type="file" accept="image/*" {...register("image")} />
      <input type="submit" disabled={uploading} />
      {uploading && <p>Uploading image...</p>}
    </form>
  );
};