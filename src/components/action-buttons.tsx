
import { Button } from './ui/button';

export function ActionButtons() {
  return (
    <div className="flex gap-2 p-4">
      <Button variant="secondary" className="flex-1 bg-zinc-800 hover:bg-zinc-700">
        Edit profile
      </Button>
      <Button variant="secondary" className="flex-1 bg-zinc-800 hover:bg-zinc-700">
        Share profile
      </Button>
    </div>
  );
}
