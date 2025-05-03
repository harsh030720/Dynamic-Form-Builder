
import DynamicForm from './components/DynamicForm';
import formConfig from './config/formConfig';


const App = () => (
  <div className="container">
    <h1>Dynamic Form Builder</h1>
    <DynamicForm config={formConfig} />
  </div>
);

export default App;
