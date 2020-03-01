import React from 'react';

export default function ModuleSelectDialog(props)
{
    return (
        <dialog open={true}>
            <select>
                <option>FSA</option>
            </select>
            <fieldset>
                <button onClick={() => ('fa')}>LAUNCH</button>
            </fieldset>
        </dialog>
    );
}
ModuleSelectDialog.propTypes = {

};
