
function EmptyPage({ userType }) {
  console.log(userType)
  let message = "";
  let img = '';
  switch (userType) {
    case "teacher":
      message = "You currently have no content, upload your first video";
      img = '/empty.svg'
      break;

    case "guest":
      message = "No content yet";
      img = '/nocontent.svg'

      break;
    // case "student":
    //   message = "You're not a teacher, homie";
    //   break;
    case "404":
      message = "Your favorite teacher isn't here yet, maybe give them a call ?";
      img = '/404.svg'

      break;

    default:
      break;
  }


  return (<div className="flex items-center flex-col gap-8 w-full mt-11">
    <Image className="mb-5" src={img} width={700} height={500} alt="empty icon" />
    <p className="text-4xl p-2">{message}</p>
    {userType === "teacher" && <UploadButton size="lg" />}
  </div>
  );


}