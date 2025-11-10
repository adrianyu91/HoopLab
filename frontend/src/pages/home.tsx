import {
  Button,
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  Stack,
  Group,
  ThemeIcon,
  Badge,
} from '@mantine/core';
import {
  IconPlayerPlay,
  IconClipboardList,
  IconTrophy,
  IconSearch,
  IconPlus,
  IconChartLine,
} from '@tabler/icons-react';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import classes from './styles/home.module.css';

export function Home() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (auth.isAuthenticated) {
      navigate('/workout');
    } else {
      auth.signinRedirect();
    }
  };

  const features = [
    {
      icon: IconPlayerPlay,
      title: 'Extensive Workout Library',
      description:
        'Access 100+ basketball-specific drills covering shooting, dribbling, finishing, and passing. Filter by difficulty level from beginner to professional.',
      image: '🏀',
    },
    {
      icon: IconClipboardList,
      title: 'Build Custom Training Plans',
      description:
        'Create personalized workout plans tailored to your goals. Select from our library, customize sets and reps, and organize your training schedule.',
      image: '📋',
    },
    {
      icon: IconTrophy,
      title: 'Track Your Progress',
      description:
        'Monitor your training journey with detailed workout logs. Update your plans, track completed sessions, and watch yourself improve over time.',
      image: '🏆',
    },
  ];

  const steps = [
    {
      icon: IconSearch,
      number: 1,
      title: 'Browse Workouts',
      description:
        'Explore our comprehensive library of basketball drills. Filter by level and category to find exactly what you need.',
    },
    {
      icon: IconPlus,
      number: 2,
      title: 'Create Your Plan',
      description:
        'Build a custom training plan by selecting workouts. Adjust sets, reps, and add personal notes to each exercise.',
    },
    {
      icon: IconChartLine,
      number: 3,
      title: 'Track & Update',
      description:
        'Follow your plan and update your progress. Edit workouts as you improve and reach new skill levels.',
    },
  ];

  return (
    <div className={classes.wrapper}>
      {/* Header Section */}
      <Container size="lg" className={classes.headerSection}>
        <Title className={classes.title} ta="center">
          Welcome to{' '}
          <Text
            component="span"
            className={classes.highlight}
            inherit
          >
            HoopLab
          </Text>
        </Title>
        <Text className={classes.description} ta="center" mt="md">
          Your personal basketball training platform. Browse curated workouts, create custom
          training plans, and track your progress as you elevate your game to the next level.
        </Text>
      </Container>

      {/* Feature Showcase - Alternating Layout */}
      <Container size="lg" className={classes.featuresSection}>
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className={`${classes.featureRow} ${index % 2 === 1 ? classes.reversed : ''}`}
          >
            <div className={classes.featureContent}>
              <Group mb="md">
                <ThemeIcon size={50} radius="md" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
                  <feature.icon size={28} stroke={1.5} />
                </ThemeIcon>
              </Group>
              <Title order={2} className={classes.featureTitle}>
                {feature.title}
              </Title>
              <Text className={classes.featureDescription} mt="sm">
                {feature.description}
              </Text>
            </div>
            <div className={classes.featureImage}>
              <Card className={classes.imageCard} padding="xl" radius="md">
                <div className={classes.imagePlaceholder}>
                  <Text size="80px">{feature.image}</Text>
                </div>
              </Card>
            </div>
          </div>
        ))}
      </Container>

      {/* How It Works Section */}
      <Container size="lg" className={classes.stepsSection}>
        <Title order={2} ta="center" mb="xl" className={classes.sectionTitle}>
          How It Works
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl">
          {steps.map((step) => (
            <Card key={step.number} className={classes.stepCard} padding="lg" radius="md">
              <Stack align="center" gap="md">
                <ThemeIcon
                  size={60}
                  radius="md"
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
                >
                  <step.icon size={30} stroke={1.5} />
                </ThemeIcon>
                <Badge size="lg" variant="light" color="blue">
                  Step {step.number}
                </Badge>
                <Title order={3} ta="center" className={classes.stepTitle}>
                  {step.title}
                </Title>
                <Text ta="center" className={classes.stepDescription}>
                  {step.description}
                </Text>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Container>

      {/* CTA Section */}
      <Container size="lg" className={classes.ctaSection}>
        <Stack align="center" gap="md">
          <Title order={2} ta="center" className={classes.ctaTitle}>
            Ready to Start Your Basketball Journey?
          </Title>
          <Text ta="center" className={classes.ctaDescription}>
            Join HoopLab today and take your training to the next level
          </Text>
          <Group mt="md">
            <Button
              size="lg"
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
              onClick={handleGetStarted}
            >
              {auth.isAuthenticated ? 'Browse Workouts' : 'Get Started'}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/contact')}
            >
              Contact Us
            </Button>
          </Group>
        </Stack>
      </Container>
    </div>
  );
}

export default Home;
