export async function apiCall(apiParams) {
    var apiOperation = apiParams.operation || null; 
    var apiRequestParams = {
        method: apiOperation,
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': ['http://localhost:3000'],
            'content-type': 'application/json'
        }
    }

    if (apiOperation === 'GET') {
        let returnedDataSet;
        try {
            returnedDataSet = await fetch('./data/events.json', apiRequestParams)
                .then(res => res.json());
        } catch (error) {
            console.error(error);
        }

        return returnedDataSet;
    }
};