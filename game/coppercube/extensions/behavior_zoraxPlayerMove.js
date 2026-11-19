/*
  <behavior jsname="behavior_zoraxPlayerMove"
    description="ZORAX - Basic keyboard player movement">
    <property name="MoveSpeed" type="float" default="0.12" />
  </behavior>
*/

behavior_zoraxPlayerMove = function()
{
  this.KeysDown = {};
  this.LastTime = null;
};

behavior_zoraxPlayerMove.prototype.onKeyEvent = function(key, pressed)
{
  this.KeysDown[key] = pressed;
};

behavior_zoraxPlayerMove.prototype.onAnimate = function(node, timeMs)
{
  if (this.LastTime === null)
  {
    this.LastTime = timeMs;
    return false;
  }

  var delta = timeMs - this.LastTime;
  this.LastTime = timeMs;

  // Prevent a large jump after the game window pauses.
  if (delta < 0) delta = 0;
  if (delta > 100) delta = 100;

  var forward = 0;
  var side = 0;

  // W / Up, S / Down, A / Left, D / Right
  if (this.KeysDown[87] || this.KeysDown[38]) forward += 1;
  if (this.KeysDown[83] || this.KeysDown[40]) forward -= 1;
  if (this.KeysDown[68] || this.KeysDown[39]) side += 1;
  if (this.KeysDown[65] || this.KeysDown[37]) side -= 1;

  if (forward === 0 && side === 0)
    return false;

  // Normalize diagonal movement so it is not faster.
  var length = Math.sqrt(forward * forward + side * side);
  forward /= length;
  side /= length;

  var pos = ccbGetSceneNodeProperty(node, "Position");
  var distance = this.MoveSpeed * delta;

  pos.x += side * distance;
  pos.z += forward * distance;

  ccbSetSceneNodeProperty(node, "Position", pos);
  return true;
};
