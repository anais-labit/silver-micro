

export default function UserCard() {

    const userInfo = 
        {
            name: "John Doe",
            role: "User",
        }
    return (
        <div className="flex flex-col bg-blue-200 h-24 w-42">
            
            <h3> Welcome {userInfo.name}</h3>
            <p>{userInfo.role}</p>
            
        </div>
    );
}