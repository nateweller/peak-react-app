import { useAlerts, useDataStore, useDataStoreItem } from './';
import { API } from './../api';

/**
 * useForm() Hook
 * 
 * Reusable structure for handling form submissions.
 * 
 * @param {object} config 
 * 
 * @returns {object}
 */
function useForm(config = {}) {
    /**
     * Configuration
     * 
     * @property {?number} id           The database ID of the object this form is modifying.
     *                                  Null when form is creating a new object.
     * 
     * @property {string}  apiCommand   The base path for the API upsert command, not including the ID.
     *                                  i.e. "climbs"
     * 
     * @property {function} onSuccess   The callback to run after a successful form submission.
     * @property {function} onError     The callback to run after a failed form submission.
     * @property {function} onComplete  The callback to run after a form submission.
     */
    const {
        id = null,
        apiCommand = '',
        onSuccess = () => {},
        onError = () => {},
        onComplete = () => {}
    } = config;

    const alerts = useAlerts();

    const dataStore = useDataStore();

    const { useData: data } = useDataStoreItem(id ? `${apiCommand}/${id}` : null);

    /**
     * onSubmit()
     * 
     * Pass this directly to Formik's onSubmit prop.
     * @link https://formik.org/docs/api/formik#onsubmit-values-values-formikbag-formikbag--void--promiseany
     * 
     * @param {object}  values 
     * @param {object}  formikBag
     */
    const onSubmit = (values, { setSubmitting }) => {
        API.upsert(apiCommand, id, values)
            .then((response) => {
                // save the upserted object in the data store
                if (response?.data?.id) {
                    dataStore.set(`${apiCommand}/${response.data.id}`, response.data);
                }

                setSubmitting(false);

                // run the success callback
                if (typeof onSuccess === 'function') {
                    onSuccess(response);
                }
            })
            .catch((error) => {
                // add the error message to the form alerts
                alerts.add({
                    message: error?.response?.data?.message || error?.message || 'Unknown Error',
                    type: 'danger',
                    isDismissable: true
                });

                setSubmitting(false);

                // run the error callback
                if (typeof onError === 'function') {
                    onError(error);
                }
            })
            .finally(() => {
                // run the complete callback
                if (typeof onComplete === 'function') {
                    onComplete();
                }
            });
    };

    return {
        alerts,
        data,
        onSubmit
    };
}

export default useForm;