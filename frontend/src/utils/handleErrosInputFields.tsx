/* eslint-disable max-len */

'use client';

import ErrorInputField from '../components/ErrorInputField';

const handleErrosInputFields = (errorData: string | string[] | null, id: string, placeholder: string) => {
  if (errorData === null) return;

  if (Array.isArray(errorData)) {
    const filteredErrors = errorData
      .filter((err) => (err.toLocaleLowerCase().includes(id.toLocaleLowerCase()) || err.toLowerCase().includes(placeholder.toLowerCase())));

    return (<div className="flex flex-col">{filteredErrors.map((err, index) => (<ErrorInputField key={ index } errors={ err } />))}</div>);
  }

  if (errorData.includes(placeholder.toLocaleLowerCase()) || errorData.includes(placeholder)) {
    return (<div><ErrorInputField errors={ errorData } /></div>);
  }

  if (errorData.includes('credentials') || errorData.includes('Password do not match!')) {
    return (<div><ErrorInputField errors={ errorData } /></div>);
  }
};

export default handleErrosInputFields;
