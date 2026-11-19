# ZORAX CopperCube JavaScript starter

## Install the movement behavior

1. Close CopperCube.
2. Open your Windows Documents folder.
3. Create this folder if it does not exist:
   `CopperCube\extensions`
4. Download `behavior_zoraxPlayerMove.js` from this repository and copy it into that extensions folder.
5. Start CopperCube again, or use **Edit > Plugins > Reload and Verify Extensions**.
6. In your scene, select the player mesh (a temporary cube is fine).
7. Open the **Behaviors** tab, click **+**, and choose **ZORAX - Basic keyboard player movement**.
8. Run the scene. Use **W/A/S/D** or the arrow keys.

## Notes

- This is the first movement test, not a complete third-person controller.
- Movement is on the scene's world X/Z plane. It does not yet include camera-relative movement, jumping, gravity, collision, animation, weapons, or networking.
- Set the behavior's MoveSpeed property to tune movement.
- Keep a backup of your CopperCube project before importing external models or changing engine versions.
