import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal} from "react-dom"

const ResultModal = forwardRef(function ResultModal({ result, targetTime, remainingTime, onReset },ref) {

    const dialog = useRef();

    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    // const score = ((targetTime*1000-remainingTime) / targetTime / 10).toFixed(0);
    // const score = Math.round((100 - remainingTime / targetTime / 10));
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        };
    });

    return createPortal(
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
            {userLost && <h2>You Lost </h2>}
            {!userLost && <h2>You Win, Your Score is {score}</h2>}
            
            <p>
                The target time was <strong>{targetTime}</strong> seconds.
            </p>
            <p>
                You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong>
            </p>
            {/* <form method="dialog" onSubmit={onReset}> */}
            <form method="dialog">
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById("modal")
    );
});

export default ResultModal;
