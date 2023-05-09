import React, { useState } from 'react';
import { 
  Button,
  FormControl,
  InputLabel,
  Input,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
 } from '@material-ui/core';

const carreras = [
  'Ingeniería en Sistemas Computacionales',
  'Ingeniería en Mecatrónica',
  'Ingeniería Civil',
  'Ingeniería en Tecnología de la Información',
  'Ingeniería Química',
  'Ingeniería Industrial',
  'Licenciatura en Administración'
];

const Formulario = () => {
  const [matricula, setMatricula] = useState('');
  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('');
  const [foto, setFoto] = useState(null);
  const [registros, setRegistros] = useState([]);
  const [registroActual, setRegistroActual] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoRegistro = { matricula, nombre, carrera, foto };
    if (registroActual !== null) {
      // Modificar registro existente
      const nuevosRegistros = registros.map((registro, index) => {
        if (index === registroActual) {
          return nuevoRegistro;
        }
        return registro;
      });
      setRegistros(nuevosRegistros);
      setRegistroActual(null);
    } else {
      // Agregar nuevo registro
      setRegistros([...registros, nuevoRegistro]);
    }
    setMatricula('');
    setNombre('');
    setCarrera('');
    setFoto(null);
  };

  const handleEdit = (index) => {
    const registro = registros[index];
    setMatricula(registro.matricula);
    setNombre(registro.nombre);
    setCarrera(registro.carrera);
    setFoto(registro.foto);
    setRegistroActual(index);
  };

  const handleDelete = (index) => {
    const nuevosRegistros = registros.filter((registro, i) => i !== index);
    setRegistros(nuevosRegistros);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <InputLabel htmlFor="matricula-input">Matricula:</InputLabel>
          <Input 
            id="matricula-input" 
            type="text" 
            value={matricula} 
            onChange={(e) => setMatricula(e.target.value)}
          />
        </FormControl>
        <br />
        <FormControl>
          <InputLabel htmlFor="nombre-input">Nombre de estudiante:</InputLabel>
          <Input 
            id="nombre-input" 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)}
          />
        </FormControl>
        <br />
        <FormControl>
          <InputLabel id="carrera-select-label">Carrera:</InputLabel>
          <Select
            labelId="carrera-select-label"
            id="carrera-select"
            value={carrera}
            onChange={(e) => setCarrera(e.target.value)}
          >
            <MenuItem value="">Seleccionar carrera</MenuItem>
            {carreras.map((carrera) => (
<MenuItem value={carrera} key={carrera}>
{carrera}
</MenuItem>
))}
</Select>
</FormControl>
<br />
<FormControl>
<InputLabel htmlFor="foto-input">Foto:</InputLabel>
<Input
id="foto-input"
type="file"
onChange={(e) => setFoto(e.target.files[0])}
inputProps={{
accept: 'image/*',
}}
/>
</FormControl>
<br />
<Button variant="contained" color="primary" type="submit">
{registroActual !== null ? 'Guardar cambios' : 'Guardar'}
</Button>
</form>
<br />
<Table>
<TableHead>
<TableRow>
<TableCell>Matricula</TableCell>
<TableCell>Nombre</TableCell>
<TableCell>Carrera</TableCell>
<TableCell>Foto</TableCell>
<TableCell>Acciones</TableCell>
</TableRow>
</TableHead>
<TableBody>
{registros.map((registro, index) => (
<TableRow key={index}>
<TableCell>{registro.matricula}</TableCell>
<TableCell>{registro.nombre}</TableCell>
<TableCell>{registro.carrera}</TableCell>
<TableCell>
{registro.foto !== null ? (
<img src={URL.createObjectURL(registro.foto)} alt={registro.foto.name} height="50" />
) : (
''
)}
</TableCell>
<TableCell>
<Button variant="contained" color="primary" onClick={() => handleEdit(index)}>
Editar
</Button>
<Button variant="contained" color="secondary" onClick={() => handleDelete(index)}>
Eliminar
</Button>
</TableCell>
</TableRow>
))}
</TableBody>
</Table>
</>
);
};

export default Formulario;