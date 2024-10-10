/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, name: 'Jack', phone: 88885555,
    bookingTime: new Date(), destination: 'Singapore',
  },
  {
    id: 2, name: 'Rose', phone: 88884444,
    bookingTime: new Date(), destination: 'Thailand',
  },
];


function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/}
  const { traveller } = props;
  return (
    <tr>
	  {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      <td>{traveller.id}</td>
      <td>{traveller.name}</td>
      <td>{traveller.phone}</td>
      <td>{traveller.bookingTime.toLocaleString()}</td>{/* 转换日期为字符串, React组件中的一个td元素（在TravellerRow组件中）试图渲染一个不是合法React子元素的值。具体来说，错误信息指出一个日期对象（Fri Oct 11 2024 00:17:43 GMT+0800 (中国标准时间)）被直接用作React子元素，这是不允许的。*/}
      <td>{traveller.destination}</td>
    </tr>
  );
}

function Display(props) {
  const { travellers } = props;
	/*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/
  return (
    <table className="bordered-table">
      <thead>
        <tr>
	  {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Booking Time</th>
          <th>Destination</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
        {travellers.map(function(traveller) {return <TravellerRow key={traveller.id} traveller={traveller} />;})}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const form = document.forms.addTraveller;
    const newTraveller = {
      //id: this.props.travellers.length + 1,
      id: this.props.nextId, // 使用传递的 nextId 作为新乘客的 id
      name: form.travellername.value,
      phone: form.travellerphone.value,
      bookingTime: new Date(),
      destination: form.travellerdestination.value,
      
    };
    this.props.bookTraveller(newTraveller);
    form.reset();
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
	    {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" />
        <input type="text" name="travellerphone" placeholder="Phone" />
        <input type="text" name="travellerdestination" placeholder="Destination" />
        <button>Add</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    const form = document.forms.deleteTraveller;
    console.log(form.travellername.value);
    this.props.deletefunction(form.travellername.value);
    
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
	    {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
	<input type="text" name="travellername" placeholder="Name" />
        <button>Delete</button>
      </form>
    );
  }
}

class SeatMap extends React.Component {
  render() {
    const { totalSeats, bookedSeats } = this.props;
    const seats = Array.from({ length: totalSeats }, (_, index) => (
      <div
        key={index}
        className={`seat ${index < bookedSeats ? 'booked' : ''}`}
      ></div>
    ));

    return <div className="seat-map">{seats}</div>;
  }
}

class Homepage extends React.Component {
	constructor() {
	super();
	}
	render(){
	return (
	<div>
		{/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
    <h2>Remaining Seats: {10-this.props.bookedSeats}</h2>
    <SeatMap totalSeats={10} bookedSeats={this.props.bookedSeats} />
	</div>);
	}
}
class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 1, totalSeats:10, bookedSeats:2, nextId: 3};
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
    this.setSelector = this.setSelector.bind(this);
  }

  setSelector(value)
  {
  	/*Q2. Function to set the value of component selector variable based on user's button click.*/
    this.setState({ selector: value });
  }
  componentDidMount() {
    this.loadData();
  }
  componentDidUpdate() {
    console.log(this.state.travellers);
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(passenger) {
	    /*Q4. Write code to add a passenger to the traveller state variable.*/
      this.setState((prevState) => ({
        travellers: [...prevState.travellers, passenger], bookedSeats: prevState.bookedSeats + 1, nextId: prevState.nextId + 1
      }));
  }

  deleteTraveller(passenger) {
	  /*Q5. Write code to delete a passenger from the traveller state variable.*/
    console.log("Delete: " , passenger);
    //actual delete code
    var newlist = []
    this.state.travellers.forEach(element => {
      if(element.name != passenger)
      {
        newlist.push(element);
      }
      this.setState({travellers: newlist, bookedSeats: this.state.bookedSeats-1}); 
    });
  }
  render() {
    let content;
    if (this.state.selector === 1) {
      content = <Homepage travellers={this.state.travellers} bookedSeats={this.state.bookedSeats} />;
    } else if (this.state.selector === 2) {
      content = <Display travellers={this.state.travellers} />;
    } else if (this.state.selector === 3) {
      content = <Add bookTraveller={this.bookTraveller} travellers={this.state.travellers} nextId={this.state.nextId}/>;
    } else if (this.state.selector === 4) {
      content = <Delete deletefunction={this.deleteTraveller} />;
    }
    return (
      <div>
        <h1>Ticket To Ride</h1>
	      <nav>
	      {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
        <button onClick={() => this.setSelector(1)}>Homepage</button>
        <button onClick={() => this.setSelector(2)}>Display Travellers</button>
        <button onClick={() => this.setSelector(3)}>Add Traveller</button>
        <button onClick={() => this.setSelector(4)}>Delete Traveller</button>
	      </nav>
	      <div>
          {content}
		{/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
		{/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
    {/*<Homepage travellers={this.state.travellers} />*/}
		{/*Q3. Code to call component that Displays Travellers.*/}
		{/*Q4. Code to call the component that adds a traveller.*/}
    {/*<Add bookTraveller={this.bookTraveller} travellers={this.state.travellers}/>*/}
		{/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
    {/*<Delete deletefunction={this.deleteTraveller}/>*/}
	      </div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));