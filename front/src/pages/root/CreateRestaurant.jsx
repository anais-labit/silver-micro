import React from 'react';
import FormInput from '../../components/FormInput';
import ValidateButton from '../../components/ValidateButton';
import BackButton from '../../components/BackButton';

export default function CreateRestaurant() {
    return (
        <section className="flex flex-col items-center">
            <div>
                <BackButton />
                <h2>Ajouter un restaurant</h2>
            </div>
            <form className="flex flex-col justify-center items-center">
                <div className="flex flex-row items-center space-y-2 relative">
                    <FormInput
                        type="text"
                        placeholder="Nom du restaurant"
                        name="name"

                    />
                </div>
                
                <div className="flex flex-row items-center space-y-2 relative">
                    <FormInput
                        type="text"
                        placeholder="Owner_id"
                        name="ownerId"
                    />
                </div>
                <div className="flex items-center space-y-4 w-full pt-4">
                <ValidateButton className="space-y-2" label="Create" />
                </div>
            </form>


        </section>
    )
}