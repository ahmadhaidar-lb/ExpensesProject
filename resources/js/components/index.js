import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Chart from 'react-apexcharts'
let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

export default class Categories extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      edit: false,
      showForm: false,
      title: '',
      filter: 'Show All',
      pieChart:false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    console.log(this.state.title);
  }
  handleSubmit(e) {

    e.preventDefault();
    let title = this.state.title;
    let x = {};
    x.title = title;

    let requestBody = JSON.stringify(x);
    console.log(requestBody);
    fetch('/categories/add', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/JSON',
        'X-CSRF-TOKEN': token
      },
      body: requestBody
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);

      });
    /*  this.setState(prevState => ({
       list: prevState.list.concat(x)
     })) */
    this.componentDidMount();


    this.setState({ showForm: false, title: '' });

  }
  componentDidMount() {
    axios.get('/categories').then(response => {
      this.setState({ categories: response.data });
     
    }).catch(errors => {
      console.log(errors);
    });

  }
  delete(id) {


    let requestBody = JSON.stringify({ id });

    fetch('/categories/delete/' + id, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/JSON',
        'X-CSRF-TOKEN': token
      },
      body: requestBody
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);

      });
    this.componentDidMount();

  }
  /* edit(bla)
  {
    this.setState({update: bla});
    console.log(this.state.update);
    axios.post('/categories').then(response => {
      this.setState({ categories: response.data });
      console.log(this.state.list);
    }).catch(errors => {
      console.log(errors);
    });
  } */
  renderForm() {
    return (<div>
      <form onSubmit={this.handleSubmit}>

        <input name="title"
          type="text" placeholder="enter category name here"
          value={this.state.title}
          onChange={this.handleInputChange}></input>
        <button type="submit" className="btn btn-warning btn-sm">Add</button>

      </form>


    </div>);

  }
  toggleBtn() {
    this.setState({
      pieChart: !this.state.pieChart
    })
   
   
    
  }
  showPie(){
    return (<Donut filter={this.state.filter} categories={this.state.categories}></Donut>);
  }
  render() {
    const { showForm } = this.state;
    const { pieChart } = this.state;
    return (
      <div className="container">
        <button onClick={() => this.setState({ showForm: true })}>Add Category</button>
        {showForm && this.renderForm()}
        <select name='filter' onChange={this.handleInputChange}>
          <option>Show All</option>
          <option value={1}>January</option>
          <option value={2}>February</option>
          <option value={3}>March</option>
          <option value={4}>April</option>
          <option value={5} >May</option>
          <option value={6}> June</option>
          <option value={7}>July</option>
          <option value={8}>August</option>
          <option value={9}>September</option>
          <option value={10}>October</option>
          <option value={11}>November</option>
          <option value={12}>December</option>
        </select>

        {
          this.state.categories.map(
            data =>

              <UserExpenses key={data.id} filter={this.state.filter} update={() => {
                this.componentDidMount()
              }} delete={() => {
                this.delete(data.id)
              }} name={data.name} category={data} />





          )
        }
<br></br>
<br></br>
<button className='card-header'  onClick={() =>this.toggleBtn() }>Pie Chart</button>
{pieChart && this.showPie()}
      </div>
    );
  }


}
class UserExpenses extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      showTables: false,
      showForm: false,
      amount: '',
      category: '',
      title: '',
      due_date: '',
      update: false,
      editCategory: false,
      pageNum: 1,

    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCategoryEditSubmit = this.handleCategoryEditSubmit.bind(this);

    // this.renderExpenses = this.renderExpenses.bind(this);
  }

  /* renderExpenses() {
    return this.state.list.map(item => (
      <tr>
        <td key={item.id}>{item.id}</td>
        <td key='b'>tobeadded</td>
        <td key={item.amount}>{item.amount}</td>
        <td key={item.category_name}>{item.category_name}</td>


        <td>
          <button type="button" className="btn btn-warning btn-sm">Update</button>
                        |
                        <button type="button" onClick={() => this.delete(item.id)} className="btn btn-danger btn-sm">Remove</button>
        </td>

      </tr>
    ));
  } */
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });


  }
  // add expense
  handleSubmit(e) {

    e.preventDefault();

    let amount = this.state.amount;
    let categories_id = this.props.category.id;
    let title = this.state.title;

    let x = {};
    x.amount = amount;
    x.category_name = categories_id;
    x.title = title;
    x.due_date = this.state.due_date;
    let requestBody = JSON.stringify(x);
    console.log(requestBody);
    fetch('/expenses/add', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/JSON',
        'X-CSRF-TOKEN': token
      },
      body: requestBody
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);

      });
    /*  this.setState(prevState => ({
       list: prevState.list.concat(x)
     })) */
    this.componentDidMount();
    this.props.update();
    //console.log(this.state.list);
    this.setState({ due_date: '', showForm: false, amount: '', category: '', title: '' });

  }
  componentDidMount() {
    if (this.props.filter == 'Show All') {
      axios.get('/expensesByCategory/' + this.props.category.id + '?page=' + this.state.pageNum).then(response => {
        if (JSON.stringify(this.state.list) !== JSON.stringify(response.data.data)) {
          this.setState({ list: response.data.data });
        }
      }).catch(errors => {
        console.log(errors);
      });
    }
    else{
      axios.get('/expensesByCategoryAndMonth/'+this.props.filter+'/' + this.props.category.id + '?page=' + this.state.pageNum).then(response => {
        if (JSON.stringify(this.state.list) !== JSON.stringify(response.data.data)) {
          this.setState({ list: response.data.data });
        }
      }).catch(errors => {
        console.log(errors);
      });
    }
  }

  arraySearch(arr, val) {
    for (var i = 0; i < arr.length; i++)
      if (arr[i].id === val)
        return i;
    return -1;
  }

  delete(id) {

    /*  let x = this.arraySearch(this.state.list, id);
 
     //console.log(x);
     let newState = this.state.list.slice(0, x).concat(this.state.list.slice(x + 1, this.state.list.length));
     //console.log(newState);
     this.setState({ list: newState });
  */
    let requestBody = JSON.stringify({ id });

    fetch('/expenses/delete/' + id, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/JSON',
        'X-CSRF-TOKEN': token
      },
      body: requestBody
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);

      });
    this.componentDidMount();
    this.props.update();
  }

  handleCategoryEditSubmit(e) {

    e.preventDefault();
    let title = this.state.title;
    let x = {};

    x.title = title;

    let requestBody = JSON.stringify(x);
    console.log(requestBody);
    fetch('/categories/edit/' + this.props.category.id, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/JSON',
        'X-CSRF-TOKEN': token
      },
      body: requestBody
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);

      });
    /*  this.setState(prevState => ({
       list: prevState.list.concat(x)
     })) */
    this.componentDidMount();
    this.props.update();
    //console.log(this.state.list);
    this.setState({ editCategory: false, title: '', showTables: false });


  }

  editCategoryForm() {

    return (<div>
      <form onSubmit={this.handleCategoryEditSubmit}>

        <input name="title"
          type="text" placeholder={this.props.category.name}
          value={this.state.title}
          onChange={this.handleInputChange}></input>
        <button type="submit" className="btn btn-warning btn-sm">Update</button>
        <button type="button" onClick={() => this.toggleBtnForCategoryEdit()} className="btn btn-danger btn-sm">Cancel</button>
      </form>


    </div>);
  }

  //add Expense Form
  renderForm() {

    return (<div>
      <form onSubmit={this.handleSubmit}>

        <input name="title"
          type="text" placeholder="enter title here"
          value={this.state.title}
          onChange={this.handleInputChange}></input>
        <input name="amount"
          type="text" placeholder="enter amount here"
          value={this.state.amount}
          onChange={this.handleInputChange}></input>
        {/*  <input name="category"
          type="text" placeholder="enter category here"
          value={this.state.category}
          onChange={this.handleInputChange}></input> */}
        <input name="due_date"
          type="date"
          value={this.state.due_date}
          onChange={this.handleInputChange}></input>
        <button type="submit" className="btn btn-warning btn-sm">Add</button>

      </form>


    </div>);

  }
  showTable() {
    this.componentDidMount();

    return (
      <table key={this.props.category.id} id='kousa' className="table table-hover">
        <thead>
          <tr>

            <th>#Title</th>
            <th>#Amount</th>
            <th>#Category</th>
            <th>#Due date</th>
            <th>  <button onClick={() => this.setState({ showForm: true })}>Add expense</button></th>
          </tr>
        </thead>
        <tbody>

          {
            this.state.list.map(
              item =>
                <Expense key={item.id} expense={item} update={() => {
                  this.componentDidMount()
                }} update2={() => {
                  this.props.update()
                }} delete={() => {
                  this.delete(item.id)
                }}></Expense>

            )


          }



        </tbody>
        {this.pagination()}
      </table>);
  }
  toggleBtn() {
    this.setState({
      showTables: !this.state.showTables
    })
  }
  toggleBtnForCategoryEdit() {
    this.setState({
      editCategory: !this.state.editCategory
    })
  }

  pages(pageNumber) {
    let page = [];

    for (let i = 1; i <= pageNumber; i++) {
      page.push(

        <li><a href="#" onClick={() => this.setState({ pageNum: i })}>{i} |</a></li>

      )
    }

    return page;
  }
  pagination() {
    const pageNumber = Math.ceil(this.props.category.counter / 4);
    console.log(pageNumber);
    return (<div> <ul className="pagination">{this.pages(pageNumber)}</ul></div>);
  }
  render() {


    const { showForm } = this.state;
    const { editCategory } = this.state;
    const { showTables } = this.state;
    if (!editCategory) {
      return (
        <div id="wrapper">
          <div className="main">
            <div className="main-content">
              <div className="container-fluid">
                <h3 className="page-title" onClick={this.toggleBtn.bind(this)} > {this.props.name} list ({this.props.category.counter})
              </h3>
                <button onClick={() => this.toggleBtnForCategoryEdit()}>edit</button>
                <button onClick={() => this.props.delete()}>delete</button>

                <div className="row">
                  <div className="col-md-12">
                    <div className="panel">
                      {/* <div className="panel-heading">
                                            <h3 className="panel-title">Hover Row</h3>
                                        </div> */}
                      <div className="panel-body">

                        {showTables && this.showTable()}


                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="clearfix"></div>

          {showForm && this.renderForm()}
        </div>
      )
    }

    return (
      <div>
        {this.editCategoryForm()}
      </div>
    )




  }

}



class Expense extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      title: '',
      category_name: '',
      amount: '',
      due_date: '',
      category_id: '',
      due_date: '',
      update: false,
      submit: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.setState({
      id: this.props.expense.id,
      title: this.props.expense.title,
      category_name: this.props.expense.category_name,
      amount: this.props.expense.amount,
      category_id: this.props.expense.categories_id,
      due_date: this.props.expense.due_date
    })

  }
  componentDidUpdate() {

    if (this.state.submit) {
      axios.get('/expenses/' + this.state.id).then(response => {

        this.setState({ due_date: response.data[0].due_date, title: response.data[0].title, id: response.data[0].id, category_name: response.data[0].category_name, category_id: response.data[0].categories_id, amount: response.data[0].amount });

      }).catch(errors => {
        console.log(errors);
      });

      this.setState({ submit: false })
      //this.props.update();
      this.props.update2();

    }

  }
  updateForm() {
    return (<div>
      <form onSubmit={this.handleSubmit}>
        <tr>
          <input name="title"
            type="text" placeholder="enter title here"
            value={this.state.title}
            onChange={this.handleInputChange}></input>
          <input name="amount"
            type="text" placeholder="enter amount here"
            value={this.state.amount}
            onChange={this.handleInputChange}></input>
          <input name="category_id"
            type="text" placeholder="enter category here"
            value={this.state.category_id}
            onChange={this.handleInputChange}></input>
          <input name="due_date"
            type="date"
            value={this.state.due_date}
            onChange={this.handleInputChange}></input>


          <td><button type="submit" className="btn btn-warning btn-sm">Update</button></td>
        </tr>
      </form>
    </div>

    );
    //this.props.update()
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });

  }
  handleSubmit(e) {

    e.preventDefault();

    let amount = this.state.amount;
    let categories_id = this.state.category_id;
    let title = this.state.title;
    let x = {};
    x.id = this.state.id;
    x.amount = amount;
    x.category_id = categories_id;
    x.title = title;
    x.due_date = this.state.due_date;
    //console.log(x);
    let requestBody = JSON.stringify(x);

    fetch('/expenses/edit/' + this.state.id, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/JSON',
        'X-CSRF-TOKEN': token
      },
      body: requestBody
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {


      });
    /*  this.setState(prevState => ({
       list: prevState.list.concat(x)
     })) */
    // this.props.update();
    //console.log(this.state.list);

    this.setState({ update: false });
    this.setState({ submit: true });
  }
  render() {
    if (!this.state.update) {
      return (

        <tr key={this.state.id}>

          <td key='b'>{this.state.title}</td>
          <td key={this.state.amount}>{this.state.amount}</td>
          <td key={this.state.category_name}>{this.state.category_name}</td>
          <td key={this.state.due_date}>{this.state.due_date}</td>

          <td>
            <button type="button" onClick={() => this.setState({ update: true })} className="btn btn-warning btn-sm">Update</button>

            <button type="button" onClick={() => this.props.delete()} className="btn btn-danger btn-sm">Remove</button>
          </td>

        </tr>

      )
    }
    else {
      return (
        this.updateForm())
    }
  }
}
class Donut extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
     categories:this.props.categories,
     filter:this.props.filter,
      series: [],
      options: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: [],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
    
    
    };
  }
  componentDidUpdate()
  {
    if(this.props.categories!==this.state.categories || this.state.filter!==this.props.filter)
    {
      console.log('wla');
      this.setState({categories:this.props.categories,filter:this.props.filter});
      let bla=[];
      let bla2=[];
     
      if(this.props.filter == 'Show All'){
    axios.get('/categories').then(response => {
        
        for (let i=0;i<response.data.length;i++)
        {
            /* this.setState({series:response.data[i].counter});
            this.setState({labels:this.state.labels.push(response.data[i].name)}); */
            bla.push(response.data[i].counter);
            bla2.push(response.data[i].name);
        }
        
        this.setState({series:bla});
        this.setState({options:{
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: bla2,
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }})
       
      }).catch(errors => {
        console.log(errors);
      });
      }
      else{
        axios.get('/categories/'+this.props.filter).then(response => {
        
          for (let i=0;i<response.data.length;i++)
          {
              /* this.setState({series:response.data[i].counter});
              this.setState({labels:this.state.labels.push(response.data[i].name)}); */
              bla.push(response.data[i].counter);
              bla2.push(response.data[i].name);
          }
          
          this.setState({series:bla});
          this.setState({options:{
            chart: {
              width: 380,
              type: 'pie',
            },
            labels: bla2,
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          }})
         
        }).catch(errors => {
          console.log(errors);
        });
      }
     
    }
    
    
  }
  componentDidMount(){
      let bla=[];
      let bla2=[];
      
        
        for (let i=0;i<this.state.categories.length;i++)
        {
            /* this.setState({series:response.data[i].counter});
            this.setState({labels:this.state.labels.push(response.data[i].name)}); */
            bla.push(this.state.categories[i].counter);
            bla2.push(this.state.categories[i].name);
        }
        
        this.setState({series:bla});
        this.setState({options:{
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: bla2,
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }});
       
     
      
  }


  render() {
    console.log(this.state.options);
      return (
  


<div id="chart">
<Chart options={this.state.options} series={this.state.series} type="pie" width={380} />
</div>



    );
  }
}


let btnToggle=false;
let expensesBtn = document.getElementById('expensesBtn');
expensesBtn.onclick = () => {
  btnToggle=!btnToggle;
  if(btnToggle)
  ReactDOM.render(<Categories />, document.getElementById('expenses'));
  else ReactDOM.render('', document.getElementById('expenses'));
}
