import { useEffect, useState } from "react";


function ModelList() {
    const [models, setModels] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8100/api/models/');

        if (response.ok) {
        const data = await response.json();
        setModels(data.models);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
        <h1>Models</h1>
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Name</th>
                <th>Manufacturer</th>
                <th>Picture</th>
            </tr>
            </thead>
            <tbody>
            {models.map(models => (
                <tr key={models.id}>
                <td>{models.name}</td>
                <td>{models.manufacturer.name}</td>
                <img src={models.picture_url} style={{width:300}} className="card-img-top" alt="Shoe" />
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
  }

export default ModelList;
