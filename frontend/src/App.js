import React, {Component} from 'react';
import './App.css';
import CustomModal from './components/Modal';
import axios from 'axios';




class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      modal: false,
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      todoList : []
      
    }
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
    .get("http://127.0.0.1:8000/api/tasks/")
    .then(res => this.setState({todoList: res.data}))
    .catch(err => console.log(err))
  }

  toggle = () => {
    this.setState({modal: !this.state.modal});
  };

  handleSubmit = item => {
    this.toggle();
    if(item.id){
      axios
      .put(`http://127.0.0.1:8000/api/tasks/${item.id}/`, item)
      .then(res => this.refreshList())
    }
    axios
    .post("http://127.0.0.1:8000/api/tasks/",item)
    .then(res => this.refreshList())
  };

  handleDelete = item => {
    // this.toggle();
   axios
      .delete(`http://127.0.0.1:8000/api/tasks/${item.id}/`)
      .then(res => this.refreshList());
    }

  createItem = () => {
    const item = {title: "", description: "", completed: false};
    this.setState({activeItem: item, modal: !this.state.modal});
  };

  editItem = item => {
    this.setState({activeItem: item, modal: !this.state.modal});
  };


  displayCompleted= status => {
    if(status){
      return this.setState({viewCompleted : true})
    }
    return this.setState({viewCompleted: false})
  }


  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          Completed
            </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incompleted
            </span>
      </div>
    );
  };

  renderItems = () =>{
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      item => item.completed === viewCompleted
    );

    return newItems.map(item =>(
      <li 
        key={item.id}
        className='list-group-item d-flex 
        justify-content-between align-items-center '
      >
        <span className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo": ""}`}
        title = {item.description}>
          {item.title}
        </span>
        <span className='d-inline-flex gap-2'>
          <button className='btn btn-info ' onClick={() => this.editItem(item)}>Edit</button>
          <button className='btn btn-danger btn-md' onClick={() => this.handleDelete(item)}>Delete</button>
        </span>
      </li>
    ))
  };
  
  


  render(){
    return(
      <main className='content p-3 mb-4 bg-light'>
        <h1 className='text-uppercase text-center my-4 text-black'>Task Manager</h1>
        <div className='row'>
          <div className='col-md-6 col-sm-10 mx-auto p-0'>
            <div className='card p-3'>
              <div>
                <button  onClick={this.createItem}  className='btn btn-warning btn-md'>Add Task</button>
              </div>
              {this.renderTabList()}
              <ul className='list-group list-group-flush'>
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        <footer className='my-5 mb-4 bg-light text-black text-center'>
          --Mukul Porwal-- 
        </footer>
        {this.state.modal ? (
          <CustomModal 
          activeItem ={this.state.activeItem}
          toggle={this.toggle}
          onSave={this.handleSubmit} />
        ) :null }
      </main>
    )
  }
}

export default App;
