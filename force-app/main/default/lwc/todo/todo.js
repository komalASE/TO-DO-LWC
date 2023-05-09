import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Todo extends LightningElement {
  showToDo = false;
  task = '';
  tasksToDo = [];
  // isEditable = false;

  connectedCallback() {
    
    try {
      const storedData = localStorage.getItem('tasksToDo');
      if (storedData) {
        let data = JSON.parse(storedData);
        console.log('data :', data);
        this.tasksToDo = data.tasksToDo;
      }
    } catch (e) {
      console.log('e :', e);
    }
  }

  handleClick() {
    console.log('inside function');
    this.showToDo = !this.showToDo;
  }

  handleChange(event) {
    console.log('inside the change function');
    this.task = event.target.value;
  }

  handleAdd() {
    const storageKey = 'tasksToDo';
    if (this.task.trim().length === 0) {
      const event = new ShowToastEvent({
        title: 'Error',
        message: 'Please Enter a Task First',
        variant: 'error',
      });
      this.dispatchEvent(event);
    } else {
      this.tasksToDo.push(this.task);
      localStorage.setItem(storageKey, JSON.stringify({ tasksToDo: this.tasksToDo }));
      this.task = '';
    }
  }

  handleDelete(event) {
    const index = event.target.dataset.index;
    console.log(index);
  
    let test = this.tasksToDo;
    test.splice(index, 1);
    console.log("test", test);
  
    localStorage.setItem('tasksToDo', JSON.stringify({ tasksToDo: test }));
    this.tasksToDo = [];
    this.tasksToDo = test;
    console.log('this.tasksToDo :', this.tasksToDo);
  }

  handleEdit(event) {
    console.log("inside edit function");
    console.log("inside",event.target.value);
    const index = event.target.dataset.id;
    const taskToUpdate = this.tasksToDo[index];
    const newTask = event.target.value;
    if (newTask !== taskToUpdate) {
      this.tasksToDo[index] = newTask;
      localStorage.setItem('tasksToDo', JSON.stringify({ tasksToDo: this.tasksToDo }));
    }
  }

  handleInputFocus(event) {
      const index = event.target.dataset.index;
    const taskToUpdate = this.tasksToDo[index];
    this.template.querySelector(`[data-id="${index}"]`).value;
    this.template.querySelector(`[data-id="${index}"]`).focus();
    this.template.querySelector(`[data-id="${index}"]`).disabled = false;
  }

  handleBlurField(event){
  event.target.disabled = true;
  console.log('event.target.disabled :', event.target.disabled);
}
}
