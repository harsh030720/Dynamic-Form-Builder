const formConfig = {
    fields: [
      {
        name: 'username',
        label: 'Username',
        type: 'text',
        required: true
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        required: true
      },
      {
        name: 'age',
        label: 'Age',
        type: 'number'
      },
      {
        name: 'subscribe',
        label: 'Subscribe to newsletter',
        type: 'checkbox'
      },
      {
        name: "country",
        label: "Country",
        type: "select",
        required: true,
        options: ["USA", "Canada", "India"]
      },
      {
        name: 'gender', 
        label: 'Gender',
        type: 'radio',
        options: ['Male', 'Female', 'Other']
      }
    ]
  };
  
  export default formConfig;
  