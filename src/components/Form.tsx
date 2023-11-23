import { useForm} from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
    display: flex;
    height: 95vh;
    width: 98vw;
    align-items: center;
    justify-content: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    overflow-y: hidden;
    
`

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80%;
    width: 90%;
    border: 0px solid ;
    border-radius: 5px;
    @media (max-width: 900px) {
        flex-direction: column; // Change to column layout when screen width is 900px or below
        padding: 20px;
        padding: 20px;
        margin: 15px;
    }
`

const Description = styled.div`
    flex: 1.5;
    height: 100%;
    width: 100%;

`
const Image = styled.img`
    height: 100%;
    width: 85%;
`
const FormContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: left;

`
const Heading1 = styled.h1`
    color: white;
    width: 100%;
    margin-left: 30px;
    margin-bottom: 20px;
    font-size: 90px;
    /* background-color: red; */
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    border: 0px solid black;
    width: 100%;
    /* background-color: blue; */
`

const Input = styled.input`
    margin: 0px 15px;
    padding: 10px;
    /* height: 200px; */
    border: 0px solid black;
    border-radius: 30px;
    background-color: white;
    &:focus {
    outline: none;
    border: 2px solid #a0b3f7;
  }
`
const Button = styled.button`

  border: none;
  width: 100px;
  margin: 0px 15px;
  padding: 10px 10px;
  background-color: white;
  color: black;
  cursor: pointer;
  margin-top: 10px;

  border-radius: 30px;
  
  @media (max-width: 900px) {
    margin: 20px;
}
`









interface FormData {
    name: string;
}

export const PostForm = () => {
    const [imageSrc, setImageSrc] = useState<string>('https://dashtoon.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F131d7e41-d82d-418c-9dda-51f55df96d2e%2Fed6247f0-c23e-435f-8a9c-eb9316996a1d%2FDALLE_2023-11-07_18.16.09_-_Craft_a_sophisticated_and_premium_image_that_represents_a_Comic_Creator_Web_App._Picture_an_ultra-modern_and_luxurious_artists_workspace_featuring.png?table=block&id=bca1d70e-affd-4c18-885f-f1f73af11a3f&spaceId=131d7e41-d82d-418c-9dda-51f55df96d2e&width=2000&userId=&cache=v2');

    // const navigate = useNavigate();

    const schema = yup.object().shape({
        name: yup.string().required("* You must add a name !!!"),
    })

    const { register, control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    })


    async function query(data : any) {
        try{
            const response = await fetch(
                "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
                {
                    headers: { 
                        "Accept": "image/png",
                        "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM", 
                        "Content-Type": "application/json" 
                    },
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );
            const result = await response.blob();
            return result;
        }
        catch(err){
            console.log("An Error Occured");
        }
        
    }
    
    const onSubmission = async (data: FormData) => {
        
        // navigate('/confirmationPage');
        console.log(data.name);
        query({"inputs": data.name}).then((response:any) => {
            console.log(response)
            let imageUrl = URL.createObjectURL(response)
            setImageSrc(imageUrl);
            console.log("done")
        });
    }



    return (
        <Container>
            <Wrapper>
            <FormContainer>
                    <Heading1>Generate Ideas</Heading1>
                    <Form >
                        <Input type="text" placeholder='Eg: An astronaut riding a horse in photorealistic style...' {...register("name")} />
                        <p className = "formErrors" style={{  color: "red" }}>{errors.name?.message}</p>
                        <Button onClick={handleSubmit(onSubmission)} type='submit' >
                            Comicify 
                        </Button>
                    </Form>
                </FormContainer>
                <Description>
                    <Image src={imageSrc}></Image>
                </Description>
               
            </Wrapper>
        </Container>
    )
}
