'use client'

import { AcceptedIdsPicker } from "@/components/accepted-id-picker";
import { ImagePicker } from "@/components/image-picker";
import { useFetchAcceptedIdsQuery } from "@/redux/features/artistApiSlice";
import { ArtistApplicationSchema } from "@/schemas/artist-schemas";
import { Image } from "@nextui-org/image";
import { Select, SelectItem } from "@nextui-org/select";
import { Spacer } from "@nextui-org/spacer";
import { ChangeEvent, Fragment, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

//this steps is for uploading document validations like government Id
export default function Step3 (){
    const form = useFormContext<z.infer<typeof ArtistApplicationSchema>>();
    const [frontId, setFrontId] = useState<File|null>(null)
    const [backId, setBackId] = useState<File|null>(null)
    const [idType, setIdType ] = useState<number|null>(null)
    const [idTypeInString, setIdTypeInString ] = useState<string>('')
    const {data} = useFetchAcceptedIdsQuery()


    useEffect(() => {

        const subscription = form.watch((value) => {
            value.frontId && setFrontId(value.frontId);
            value.backId && setBackId(value.backId);

        });

        return () => subscription.unsubscribe();
    }, [form]);

    useEffect(()=>{
       form.watch('idTypeInString') && setIdTypeInString(form.watch('idTypeInString') ?? '')
    },[form.watch('idTypeInString')])


    useEffect(()=>{
        if(frontId){
            form.setValue("frontId", frontId)
        }
        if(idType){
            form.setValue('idType', idType.toString())
        }
        if(backId){
            form.setValue('backId', backId)
        }
        if(idTypeInString){
            form.setValue('idTypeInString', idTypeInString)
        }

    },[frontId, idType, backId, idTypeInString])

    return (
      <Fragment>
        <div>
            <p className="text-2xl font-semibold text-blue-400">Verify Your Identity on EchoEase</p>
            <p className="text-sm text-white/50">Please provide your government ID and necessary documents to validate your echoee application.</p>
        </div>
        <Spacer y={8}/>
        <AcceptedIdsPicker idTypeInString={idTypeInString} setIdTypeInString = {setIdTypeInString} picked={idType} setPicked={setIdType}/>
        <Spacer y={4}/>
        <p className="text-sm text-white/65">Please upload an image of your ID card.</p>
        <div className="flex gap-2">
        <ImagePicker label="Front ID" width={300} isDisabled={!form.watch('idType')} imagePicked={frontId} setImagePicked={setFrontId}/>
        <ImagePicker label="Back ID" width={300} isDisabled={!form.watch('idType')} imagePicked={backId} setImagePicked={setBackId}/>
        </div>

      </Fragment>
    );
  };
