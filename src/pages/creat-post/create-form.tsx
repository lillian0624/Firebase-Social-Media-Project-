import {useForm, SubmitHandler} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup"

export const CreateForm =()=>{
    const schema = yup.object().shape({
        title: yup.string().required("You must add a title."),
        description: yup.string().required("You must add a title."),
    })

    const {register, handleSubmit}= useForm({
        resolver: yupResolver(schema),
    })

    const onCreatePost = (data:any)=>{
        console.log(data);
    }

    return <form onSubmit={handleSubmit(onCreatePost)}>
        <input placeholder="Title..." {...register("title")} />
        <textarea placeholder="Description..." {...register("description")}/>
        <input type="submit"/>
    </form>;
}