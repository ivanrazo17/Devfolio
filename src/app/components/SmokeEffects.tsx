import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useSpring } from '@react-spring/three';

interface SmokeEffectProps {
  textureUrl: string;
  numParticles?: number;
  size?: number;
  opacity?: number;
  radius?: number;
  centerPosition?: [number, number, number];
  triggerAnimation?: boolean;
}

const SmokeEffects: React.FC<SmokeEffectProps> = ({
  textureUrl,
  numParticles = 90,
  size = 50,
  opacity = 0.5,
  radius = 100,
  centerPosition = [0, -200, -900],
  triggerAnimation = false
}) => {
  const { scene, clock } = useThree();
  const smokeRef = useRef<THREE.Mesh[]>([]);
  const textureRef = useRef<THREE.Texture | null>(null);

  const { offset, scale, opacity: animOpacity } = useSpring({
    from: { offset: 0, scale: 0.5, opacity: 0 },
    to: {
      offset: triggerAnimation ? 1 : 0,
      scale: triggerAnimation ? 1 : 0.5,
      opacity: triggerAnimation ? opacity : 0
    },
    config: {
      duration: 1500,
      easing: (t: number) => t * t * (3 - 2 * t) // Ease-in-out function
    }
  });

  useEffect(() => {
    if (!triggerAnimation) {
      // If animation is not triggered, remove particles
      smokeRef.current.forEach(smoke => {
        scene.remove(smoke);
        smoke.geometry.dispose();
        (smoke.material as THREE.MeshStandardMaterial).map?.dispose();
        (smoke.material as THREE.MeshStandardMaterial).dispose();
      });
      smokeRef.current = [];
      return;
    }

    // Load texture and create particles
    const loader = new THREE.TextureLoader();
    loader.load(
      textureUrl,
      (texture) => {
        textureRef.current = texture;

        const material = new THREE.MeshStandardMaterial({
          map: texture,
          transparent: true,
          opacity: animOpacity.get(),
          depthTest: true,
          blending: THREE.AdditiveBlending,
          color: new THREE.Color('white'),
          emissive: new THREE.Color('#5888A5'),
          emissiveIntensity: 0.5
        });

        const geometry = new THREE.PlaneGeometry(size, size);
        const particles: THREE.Mesh[] = [];

        for (let i = 0; i < numParticles; i++) {
          const smoke = new THREE.Mesh(geometry, material);
          smoke.scale.set(size * scale.get(), size * scale.get(), size * scale.get());
          smoke.position.set(
            centerPosition[0] + (Math.random() - 0.5) * radius * 2,
            centerPosition[1] + (Math.random() - 0.5) * radius * 2,
            centerPosition[2] + (Math.random() - 0.5) * radius * 2
          );
          smoke.rotation.z = Math.random() * 360;
          smoke.renderOrder = -3;
          smoke.layers.set(0);

          scene.add(smoke);
          particles.push(smoke);
        }
        smokeRef.current = particles;
      },
      undefined,
      (error) => {
        console.error('Error loading texture:', error);
      }
    );

    return () => {
      smokeRef.current.forEach(smoke => {
        scene.remove(smoke);
        smoke.geometry.dispose();
        (smoke.material as THREE.MeshStandardMaterial).map?.dispose();
        (smoke.material as THREE.MeshStandardMaterial).dispose();
      });
      smokeRef.current = [];
    };
  }, [scene, textureUrl, numParticles, size, opacity, radius, centerPosition, triggerAnimation, animOpacity, scale]);

  useFrame(() => {
    if (!triggerAnimation) return;

    const delta = clock.getDelta();

    smokeRef.current.forEach(smoke => {
      smoke.rotation.z += delta * 0.5;
      const scaleValue = scale.get();
      const opacityValue = animOpacity.get();

      smoke.scale.set(size * scaleValue, size * scaleValue, size * scaleValue);
      (smoke.material as THREE.MeshStandardMaterial).opacity = opacityValue;
      (smoke.material as THREE.MeshStandardMaterial).visible = opacityValue > 0; // Ensure visibility is controlled
    });

    if (textureRef.current) {
      const texture = textureRef.current;
      const newOffset = offset.get();
      texture.offset.x = newOffset % 1;
      texture.offset.y = newOffset % 1;
      texture.needsUpdate = true;
    }
  });

  return null;
};

export default SmokeEffects;
