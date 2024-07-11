import { create } from "zustand";

type CreateWorkPlaceValues = {
    name: string;
    imageUrl : string;
    updateImageUrl : (url:string) => void;
    updateValues: (values : Partial<CreateWorkPlaceValues>) => void;
    currStep : number;
    setCurrStep : (step:number) => void;

}

export const useCreateWorkPlaceValues =  create<CreateWorkPlaceValues>((set => ({
    name : '',
    imageUrl :'',
    updateImageUrl : url => set({imageUrl : url}),
    updateValues: values => set(values),
    currStep : 1,
    setCurrStep : step => set({currStep: step}),
})))