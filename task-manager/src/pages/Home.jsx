import TaskManager from "../components/TaskManager";
import Posts from "../components/Posts";

export default function Home() {
  return (
    <div className="space-y-8">
      <TaskManager />
      <Posts />
    </div>
  );
}
