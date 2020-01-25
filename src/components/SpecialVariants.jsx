import React, { Component } from 'react';
import { specialVariants } from '../helpers/urlFor'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import AddVariant from './Modal/AddVariant'
import EditVariant from './Modal/EditVariant'



class SpecialVariants extends Component {
    constructor() {
        super();
        this.toggleAddModal = this.toggleAddModal.bind(this);
        this.toggleEditModal = this.toggleEditModal.bind(this);
        this.getVariants = this.getVariants.bind(this);
        this.state = {
            params: '',
            special_id: '',
            variants: [],
            addModalOpen: false,
            editModalOpen: false,
            variant_index: '',
            isSpecial: true
        }

    }

    toggleAddModal = () => {
        let { addModalOpen } = this.state
        this.setState({addModalOpen: !addModalOpen})
    }

    toggleEditModal = () => {
        let { editModalOpen } = this.state
        this.setState({editModalOpen: !editModalOpen})
    }

    deleteButtonClick = (id) => {

        this.deleteVariant(id)
    }

     deleteVariant = (id) => {
        let {  special_id , params  } = this.props
        
        axios.delete(specialVariants(params.id, special_id, id), {withCredentials: true})
        .then((result) => {
            window.location.reload(false);
        });
    }

    editButtonClicked = (id) => {
        
        this.setState({variant_index: id})
        this.toggleEditModal()
    }

    componentDidMount = () => {  
        this.setState({ variants: [], params: this.props.params.id, special_id: this.props.special_id});
        this.getVariants();          
    }    

    componentDidUpdate(prevProps) {
        
        if (prevProps.params.id !== this.props.params.id) {
            this.setState({ variants: [], params: this.props.params.id, special_id: this.props.special_id});     
            this.getVariants();
            
        }
        
    }

    async getVariants() {
        let { special_id, params } = this.props

        try {
            const response = await axios.get(specialVariants(params.id, special_id));
            response.data.sort((a, b) => a.id - b.id)
            this.setState({variants: response.data})
          } catch (error) {
            console.error(error);
          }
        
    }


    render() { 
        const { variants, params, special_id, addModalOpen, editModalOpen, variant_index, isSpecial } = this.state
 
        const currentVariants = variants.map((variant, index) => {
            return (
                <div key={index}>
                    <div className="variants container mt-0">
                        <div className="row mt-1 justify-content-center">
                            { variant.picture.url ? 
                                <div className="col-4 d-none d-sm-block">
                                    <img className="variant img-fluid" src={variant.picture.url}  alt="variant"></img>
                                </div>
                                :
                                null
                            }
                        </div>
                        <div className="col">
                            <div className="row mt-1 text-left">
                                <div className="col">
                                    <div className="row mx-md-3">
                                        <div className="col my-xl-5 my-lg-4 my-md-3">
                                            <div  className="">
                                            Type: {variant.input_type}
                                            </div>
                                        </div>
                                        <div className="col my-xl-5 my-lg-4 my-md-3">
                                            <div  className="">
                                            First Active: {variant.startup}
                                            </div>
                                        </div>
                                        <div className="col my-xl-5 my-lg-4 my-md-3">
                                            <div  className="">
                                            Active: {variant.active}
                                            </div>
                                        </div>
                                        <div className="w-100"></div>
                                        <div className="col my-xl-5 my-lg-4 my-md-3">
                                            <div  className="">
                                            Recovery: {variant.recovery !== null ? variant.recovery : "N/A"}
                                            </div>
                                        </div>
                                        <div className="col my-xl-5 my-lg-4 my-md-3">
                                            <div  className="">
                                            Advantage: {variant.advantage !== null ? variant.advantage : "N/A"}
                                            </div>
                                        </div>
                                        <div className="col my-xl-5 my-lg-4 my-md-3">
                                            <div  className="">
                                            Gaurd: {variant.gaurd}
                                            </div>
                                        </div>
                                        <div className="w-100"></div>
                                        <div className="col">
                                            <div  className="notes-box text-left">
                                                Notes: {variant.special_notes}
                                            </div>    
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row col mb-2">
                            {this.props.user && this.props.user.admin ? 
                            <div className="float-right col">
                                <button className="btn btn-primary btn-sm float-right" onClick={ (event) => this.editButtonClicked(index)}>Edit Variant</button>
                                <button className="btn btn-danger btn-sm float-left" onClick={ (event) => window.confirm("Are you sure you want to delete that?") && this.deleteButtonClick(variant.id)}>Delete Variant</button>  
                            </div> 
                            : null} 
                        </div> 
                         
                        
                    </div>
                </div>
            );
        });

        return ( 
            <div>
                {this.props.user && this.props.user.admin ?
                <div>
                    <button className="btn btn-primary btn-sm float-right" onClick={this.toggleAddModal}>Add Variants</button> 
                    <br></br>
                    <br></br>
                </div>
                : 
                null}
                {variants.length !== 0 ? 
                <div id={`variant-accordion-${special_id}`}>
                    <div className="card">
                        <div className="card-header" id="variantHeading">
                            <h5 className="mb-0">
                                <button className="btn btn-link" data-toggle="collapse" data-target={`#variant-${special_id}`} aria-expanded="true" aria-controls="collapseOne">
                                    Input Variant Information
                                </button>
                            </h5>
                        </div>
                        <div id={`variant-${special_id}`} className="collapse" aria-labelledby="headingOne" data-parent={`#variant-accordion-${special_id}`}>
                            <div className="card-body">
                                {currentVariants} 
                            </div>
                        </div>
                    </div>

                     
                </div>                  
                : null}

                
                <Modal 
                    show={addModalOpen}
                    size="lg"
                >
                    <Modal.Header>
                        <button className="btn btn-primary float-right" onClick={this.toggleAddModal}>cancel</button>
                    </Modal.Header>
                    <AddVariant 
                    params={params}
                    move_id={special_id}
                    getVariants={this.getVariants}
                    toggleAddModal={this.toggleAddModal}
                    isSpecial={isSpecial}
                
                />
                
            </Modal>

            <Modal 
                show={editModalOpen}
                size="lg"
                >
                <Modal.Header>
                    <button className="btn btn-primary float-right" onClick={this.toggleEditModal}>cancel</button>
                </Modal.Header>
                <EditVariant 
                params={params}
                props={variants[variant_index]}
                move_id={special_id}
                getVariants={this.getVariants}
                toggleEditModal={this.toggleEditModal}
                isSpecial={isSpecial}

                />
                
            </Modal>

            </div>            
         );
    }
}
 
export default SpecialVariants;