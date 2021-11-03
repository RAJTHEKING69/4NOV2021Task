import React, { Component } from 'react'
import './pagunation.css'

export class Pagination extends Component {
    state ={
        userData : [],
        pageNumber : 1
    }

    fetchUserData = async()=>{
        const response = await fetch(`https://dummyapi.io/data/v1/user?page=${this.state.pageNumber}&limit=12`,{
            method : 'GET',
            headers : {
                'app-id' : '618224858da6bdeedeb7fbea'
            }
        });
        const {data} = await response.json();
        this.setState({
            userData : data
        })
    }

    componentDidMount(){
        this.fetchUserData();
    }

    handleClick = (num)=>{
          this.setState({pageNumber:num})
    }

    componentDidUpdate(prevsProps,prevsState){
     if(prevsState.pageNumber !== this.state.pageNumber){
         this.fetchUserData();
     }
    }

    render() {
        return (
            <div>
            <div className='d-flex flex-row flex-wrap container '>{
                this.state.userData.map((details)=>(
                <div className="card col-lg-6 m-3" style={{width: '18rem'}}>
                      <img src={details.picture} class="card-img-top" alt="user_image"/>
                           <div className="card-body">
                                <h5 className="card-title">{details.firstName + ' ' + details.lastName}</h5>
                                <p className="card-text">ID:{details.id}</p>
                            </div>
                </div>
                ))}
            </div>
            <div className='container change'>
                {
                    [1,2,3,4,5,6,7,8].map((num)=>(
                        <button className="btn btn-info m-3" onClick={()=>{this.handleClick(num)}}>{num}</button>
                    ))
                }
            </div>
            </div>
        )
    }
}

export default Pagination
