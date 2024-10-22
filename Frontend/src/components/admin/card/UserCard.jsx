import React from "react";
import './UserCard.css';

function UserCard(props) {
    const  {
        url,
        name,
        email,
        openEdit,
        openDelete,
        user
    } = props;
    console.log(props)
  return (
    <div class="card">
      <img src={url ? `${url}`: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL8AAACUCAMAAAD1XwjBAAAAMFBMVEXk5ueutLfo6uursbTDyMqxt7rh4+TY29zb3t+2u77Lz9HU19nHy825vsGnrrG/xMZ3YekEAAAEo0lEQVR4nO2c2XLrIAyGjdjBwPu/7QFnOU7SJAZki8z4u+m0N/0FsiQWMU0nJycnJycndyCjjC6o8gu1niqydJ+CvMJkEF79jglgBOPsER7Z/Asm5JF3Nj6rv5pgXXYlaoUfAeNk/Ev8hSidGXgSlrF/r36xIM/BqAaAD/xPz3nwIh78mAbA/E37jXlEA9Q311k5kRzOADDfXWflRMxQC37Cbxe/IMf6CGrlMz6SAVAtv6CpZd8xLfJZpJZ9Q1V8uWv4GB4EtlV/opZegLlRfjZgphbf+u3e0NQuBCo0D/8IHgSuQ36OQY5Yv5Fd+hlXtPrnzUXbG/20tWhr6F8ZQCkfeoc/6xeEEwDd8kmzMDgM/Y7MALD98hkLVPrzmgtDv6RKwtsX7J+hciAIKPLJigiD4v6MW5rFPHiJop8xmqVwR+H/CFEEBYGln2YZoxKW/kRShBqc8JMJFPoBKfwUKAIQaKzwQ6S/a+H+AKfRj/T5Zv0UW4mI+qM/9ZPq/3H/ofF/vPhJE39+PP5PGi3/WpL6p2vndg0nqX+mCa3+FCT68ep/mk1ocDjyGSdaP2IFIEt1koq0/0D0+U6QcPRT7UCDxtk/JLtJACgfAE32WvRjRFDCAwxQGPv/hFeBMA4ALOUBnu6egEh7E6u3huOkwz9NvYswSu9f6CtCuSCW31kESerhzzmgZ/jpzk7/G9B6/WqE6zNT2YduHn5p6Ie/bAQ1JgGidcsLjQdhcQDnv9JSx0Xq0Lmi4SiMPPKvgeo0NpT8qX4pMI/WyAPupWfq/eCTXdn4APitiYzbQQLnI6DEpkQQxagdSOA3+BDZdaUNAMzykwmcSTdw/9q0tLAF9qZ/kLMwbvPaHVB+tvzZhPwHO/vx1RdgUtolGTM8U37K5PTovZvPKO3dLMTs/DidOjXACmot21nUqoL5z/L7NHob+aLceO+cSCFYWUIOX9oKrQ0pCee9NmpMI7Iqo4tuexH90j9++aMMSczeTGPZUNr1hZWSver+IwtwKW0apw87D/zcsAXBZdLkJuT/b8SbdPudGINXhP0voPQsW8VfJiHyVL4GCvFgXKrpWX5rghX6cAsAdLLbF1xfTJAH13UAPmCJv1iQ6+rj5gBMQDj3ejHhqDVxVo859nciP+IanxH7qF8sCH5fLyoPhOymnpXknPbckga8K2NvLZDzXlkZ4PVZnz2w+0wB9LbKbmaP+1gwbdnbQSIm7HQGTVv8zWDvMPZ1ubcYgJrNctw5Vn4BzwDQR325a9A6yzftyu4A0gEZeIQqv9EAhBkATSV/MaDXAhrfv9H9DYAhiDxr+qLQ4XH/lb5EdmjW/Qvec8ej83EWHANCu3yc9wU6ab/f2nEzCRPeeGA5gvcsNF6xHMJ7Fpo8COl1BwxajrwR23u7abpsg9UdhUL1BICmlrymYQLIM+8jtccc4wSfhVj5xMUwsf9G5StTOJ05iMS6OtTgb/D3wVONfrTWTDyqHAio1b5SdbjR/6wePhVFEOLTAnhUVKFdPRV7IbenMJx36ZCRFbe4Rov+Bbl9K8WMqL/i1Xp/vW40FBW7oUaMSMWpGAzJdv0nR/EPMkVDVWPQdZ0AAAAASUVORK5CYII="} alt="Student Photo" />
      <div class="card-content">
        <h2>{name}</h2>
        <p>{email}</p>
      </div>
      <div class="card-buttons">
        <button onClick={openEdit} data-user={JSON.stringify(user)} class="edit">Edit</button>
        <button data-user={email} onClick={openDelete} class="delete">Delete</button>
      </div>
    </div>
  );
}

export default UserCard;
