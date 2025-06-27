/**
 * CarsBrandsApiService
 * This service uses JSONP to fetch car brands and models from the CarQuery API.
 * It filters the results to include only specific body types
 * @param url
 * @return {Promise<unknown>}
 * @author u202318274 Julca Minaya Sergio Gino
 */
function jsonpRequest(url) {
    return new Promise((resolve, reject) => {
        const callbackName = `jsonp_callback_${Math.round(100000 * Math.random())}`;
        const script = document.createElement('script');
        script.src = url + `&callback=${callbackName}`;

        window[callbackName] = function(data) {
            delete window[callbackName];
            document.body.removeChild(script);
            resolve(data);
        };

        script.onerror = function() {
            delete window[callbackName];
            document.body.removeChild(script);
            reject(new Error(`JSONP request to ${url} failed`));
        };

        document.body.appendChild(script);
    });
}

/**
 * CarsBrandsApiService
 * This service fetches car brands and models from the CarQuery API using JSONP.
 * It filters the results to include only specific body types.
 * @class CarsBrandsApiService
 * @author u202318274 Julca Minaya Sergio Gino
 */
export class CarsBrandsApiService {
    allowedBodyTypes = [
        'sedan', 'coupe', 'hatchback', 'convertible',
        'wagon', 'suv', 'pickup', 'van', 'minivan'
    ];

    async getCarsByMake(make, year = 2020) {
        const baseUrl = 'https://www.carqueryapi.com/api/0.3/?cmd=getTrims';
        const url = `${baseUrl}&make=${make.toLowerCase()}&year=${year}`;

        try {
            const data = await jsonpRequest(url);

            const filtered = (data.Trims || []).filter(item =>
                this.allowedBodyTypes.includes(item.model_body?.toLowerCase())
            );

            return filtered.map(item => ({
                make: item.make_display,
                model: item.model_name,
                year: item.model_year
            }));
        } catch (error) {
            console.error('Error using JSONP for CarQuery:', error);
            return [];
        }
    }
}
