import { createClient } from "@supabase/supabase-js";
import React from "react";
import { StyledRegisterVideo } from "./styles";

function useForm(propsDoForm) {
  const [values, setValues] = React.useState(propsDoForm.initialValues);

  return {
    values,
    handleChange: (evento) => {
      console.log(evento.target);
      const value = evento.target.value;
      const name = evento.target.name;
      setValues({
        ...values,
        [name]: value,
      });
    },
    clearForm() {
      setValues({});
    },
  };
}
const PROJECT_URL = "https://hkzlpadkszetckmcfyrt.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhremxwYWRrc3pldGNrbWNmeXJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0NDE1NzQsImV4cCI6MTk4NDAxNzU3NH0.0Hv-8QxrD1Jmyigk6c7abE5Mte_7D7fADiNdbp2Yub4";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

export default function RegisterVideo() {
  const formCadastro = useForm({
    initialValues: {
      titulo: "God of War Ragnarok",
      url: "https://www.youtube.com/watch?v=gqciogn3sUc",
    },
  });
  const [formVisivel, setFormVisivel] = React.useState(true);

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setFormVisivel(true)}>
        +
      </button>
      {formVisivel ? (
        <form
          onSubmit={(evento) => {
            evento.preventDefault();
            console.log(formCadastro.values);

            // Contrato entre o nosso Front e o BackEnd
            supabase
              .from("video")
              .insert({
                title: formCadastro.values.titulo,
                url: formCadastro.values.url,
                thumb: getThumbnail(formCadastro.values.url),
                playlist: "jogos",
              })
              .then((oqueveio) => {
                console.log(oqueveio);
              })
              .catch((err) => {
                console.log(err);
              });

            setFormVisivel(false);
            formCadastro.clearForm();
          }}
        >
          <div>
            <button
              type="button"
              className="close-modal"
              onClick={() => setFormVisivel(false)}
            >
              X
            </button>
            <input
              placeholder="Titulo do vídeo"
              name="titulo"
              value={formCadastro.values.titulo}
              onChange={formCadastro.handleChange}
            />
            <input
              placeholder="URL"
              name="url"
              value={formCadastro.values.url}
              onChange={formCadastro.handleChange}
            />
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      ) : (
        false
      )}
    </StyledRegisterVideo>
  );
}
