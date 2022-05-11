import { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { Formik, Form, Field, FieldProps } from "formik";
import * as yup from "yup";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface ITodoItem {
  id: string;
  name: string;
}

interface IAction {
  type: string;
  payload?: ITodoItem;
}

interface IFormValues {
  todoName: string;
}

interface IState {
  todos: ITodoItem[];
  isEditing: boolean;
  activeItem?: ITodoItem;
}

const initialState: IState = {
  todos: [
    { id: uuidv4(), name: "Walk the dog" },
    { id: uuidv4(), name: "Do the dishesss" }
  ],
  isEditing: false
};

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload!] };
    default:
      throw new Error();
  }
};

const addTodoValidationSchema = yup.object().shape({
  todoName: yup.string().required("This field is required")
});

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const submitHandler = (values: IFormValues, { resetForm }: FormikBag) => {
    dispatch({
      type: "ADD_TODO",
      payload: {
        id: uuidv4(),
        name: values.todoName
      }
    });

    resetForm({ todoName: "" });
  };
  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="sm" sx={{ mt: 20 }}>
        <Typography variant="h1">TODO TODO</Typography>
        <Typography variant="body1">A kitten dies today...</Typography>
        <Card sx={{ mt: 5 }}>
          <List>
            {state.todos.map((todo: ITodoItem) => {
              return (
                <ListItem key={todo.id}>
                  <ListItemButton>
                    <ListItemText primary={todo.name} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Card>
        <Formik
          initialValues={{ todoName: "" }}
          validationSchema={addTodoValidationSchema}
          onSubmit={submitHandler}
        >
          <Form>
            <Box sx={{ mt: 2 }}>
              <Field id="todoName" name="todoName">
                {({ field, form }: FieldProps) => (
                  <TextField
                    label="New Todo"
                    variant="outlined"
                    fullWidth
                    error={Boolean(form.errors.todoName)}
                    helperText={form.errors.todoName}
                    {...field}
                  />
                )}
              </Field>
            </Box>
            <Button variant="contained" type="submit" sx={{ mt: 2 }}>
              Add Todo
            </Button>
          </Form>
        </Formik>
      </Container>
    </div>
  );
}
