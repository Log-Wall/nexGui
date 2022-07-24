class RoomRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.myRef = React.createRef();
      }

    render() {
        console.log('table row ref')
        console.log(this.myRef.current)
    return (
        <tr>
            <td>
                {this.props.id}
            </td>
            <td>
                {this.props.name}
            </td>
        </tr>
    );
    }
  }
class RoomTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list
        };
        this.myRef = React.createRef();
        this.buildEvent = this.buildEvent.bind(this);
    }

    buildEvent(e) {
        console.log('custom Build Event');
        console.log(e.detail);
        this.setState({list: e.detail})
      }

    componentDidMount() {
        let domNode = this.myRef.current;
        console.log('no')
        console.log({domNode})
        if(domNode) {
            console.log('mounted Table')
            domNode.addEventListener('GMCP', this.buildEvent)
        }
    }
    
    getRows() {
        let rows = [];
        console.log(this.props);
        this.state.list.forEach(row => {
            rows.push(<RoomRow id={row.id} name={row.name}/>)
        })
        return rows;
    }

    render() {
        return (
            <table className="GMCP" ref={this.myRef}>
                {this.getRows()}
            </table>
        );
    }
  }


const root = ReactDOM.createRoot(document.getElementById('tbl_2h4b2'));
root.render(<RoomTable />);