export default function LoadingSpinner() {
    return <div className="d-flex justify-content-center align-items-center vh-100">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            className="spinner"
        >
            <circle
                cx="50"
                cy="50"
                fill="none"
                stroke="#000000"
                strokeWidth="8"
                r="35"
                strokeDasharray="164.93361431346415 56.97787143782138"
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    repeatCount="indefinite"
                    dur="1s"
                    values="0 50 50;360 50 50"
                    keyTimes="0;1"
                ></animateTransform>
            </circle>
        </svg>
    </div>

}